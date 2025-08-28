import argparse
import amazon.ion.simpleion as simpleion
import json
from langchain_core.documents import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from kestra import Kestra

def create_chunks_from_single_text(text: str):
    """
    Cria um objeto Document a partir de um único texto e o divide em chunks.
    """
    doc = Document(page_content=text, metadata={"source": "text_from_kafka"})
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    
    chunks = text_splitter.split_documents([doc])
    
    return chunks

parser = argparse.ArgumentParser()
parser.add_argument("--text", type=str, default="", help="Caminho do arquivo de texto a ser processado.")
args = parser.parse_args()

file_path = args.text
text_to_process = ""

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        text_to_process = file.read()
    print("Conteúdo do arquivo lido com sucesso.")
except FileNotFoundError:
    print(f"Erro: O arquivo em {file_path} não foi encontrado.")

data = None
if text_to_process:
    try:
        data = simpleion.loads(text_to_process)
        print("Dados Ion desserializados com sucesso.")
    except Exception as e:
        print(f"Erro ao desserializar o formato Ion: {e}")

json_string = None
if data and 'value' in data:
    json_string = data['value']
    print("String JSON extraída da chave 'value'.")
else:
    print("Nenhum dado Ion válido ou chave 'value' encontrada.")

kafka_topic_data = None
if json_string:
    try:
        kafka_topic_data = json.loads(json_string)
        print("Dados JSON desserializados com sucesso.")
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar a string JSON: {e}")

if kafka_topic_data:
    full_json_string = json.dumps(kafka_topic_data)
    
    text_chunks = create_chunks_from_single_text(full_json_string)
    
    chunk_dict = {
        "page_content": text_chunks[0].page_content,
        "metadata": text_chunks[0].metadata
    }

    Kestra.outputs(chunk_dict)
else:
    print("Nenhum dado válido para processar.")
    Kestra.outputs({})