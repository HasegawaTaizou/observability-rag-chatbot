import argparse
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from langchain_core.documents import Document
import json

def create_document_from_text(page_content: str, metadata: dict):
    return Document(page_content=page_content, metadata=metadata)

parser = argparse.ArgumentParser()
parser.add_argument("--json_chunk", type=str, default="", help="JSON string with the chunk data")
args = parser.parse_args()

chunk_data = json.loads(args.json_chunk)

documents = [
    create_document_from_text(
        page_content=chunk_data['page_content'],
        metadata=chunk_data['metadata']
    )
]

print(f"Número de chunks criados: {len(documents)}")

model_name = "sentence-transformers/all-MiniLM-L6-v2"
embeddings = HuggingFaceEmbeddings(model_name=model_name)

client = QdrantClient(location="http://qdrant:6333") 
collection_name = "observability_collection"
vector_size = 384 

if not client.collection_exists(collection_name=collection_name):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE)
    )

vectorstore = Qdrant(client=client, embeddings=embeddings, collection_name=collection_name)
vectorstore.add_documents(documents)

print("Base de dados Qdrant populada com sucesso usando embeddings do Hugging Face!")