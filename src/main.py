from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains.retrieval import create_retrieval_chain
from langchain_openai import AzureChatOpenAI
from langchain_community.vectorstores import Qdrant
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from qdrant_client import QdrantClient

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Inicializando modelos e cadeias da LangChain...")


model_name = "sentence-transformers/all-MiniLM-L6-v2"
embeddings = HuggingFaceEmbeddings(model_name=model_name)

qdrant_client = QdrantClient(url="http://localhost:6333")

qdrant = Qdrant(
    client=qdrant_client,
    embeddings=embeddings,
    collection_name="observability_collection"
)


retriever = qdrant.as_retriever()

llm = AzureChatOpenAI(
    azure_deployment="gpt-4o",
    api_version="2024-12-01-preview",
    temperature=0.7,
)

system_prompt = (
    "Use the given context to answer the question. "
    "If you don't know the answer, say you don't know. "
    "Use three sentence maximum and keep the answer concise. "
    "Context: {context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
chain = create_retrieval_chain(retriever, question_answer_chain)
print("Inicialização completa! O servidor está pronto para receber requisições.")


class QueryModel(BaseModel):
    query: str


@app.post("/chat")
async def chat_endpoint(request: QueryModel):
    """
    Processa uma pergunta do usuário e retorna uma resposta gerada pelo LLM.
    """
    try:
        response = chain.invoke({"input": request.query})
        return {"answer": response['answer']}
    except Exception as e:
        return {"answer": f"Ocorreu um erro ao processar a requisição: {str(e)}"}
