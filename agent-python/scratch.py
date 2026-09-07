from langchain_openai import ChatOpenAI
import os
print("env model:", os.getenv("OPENAI_MODEL"))
print("chat model:", ChatOpenAI(model="gpt-4o-mini").model_name)
