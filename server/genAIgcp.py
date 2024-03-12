# import google.generativeai as genai
# from monsterapi import client
# genai.configure(api_key='AIzaSyB-JV9h00I_lFNurzTZWc46qulRzYD--VI')
# genai.configure(api_key='AIzaSyC873-iRR976HaFu7xj1MtDEESRpW8qTro')
def read_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return content

from monsterapi import client
             
# Initialize the client with your API key
api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVmMmVkMzU3NWYyZjgxNjkyZGZhNTIyOGY2NmM0OTc1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjFUMDg6MTU6MDkuNTA4ODQ3In0.7q6dFIFPsxRWnSEk9eZuo9HQxpmXGyvoWNKuu9_1f5Q'  # Replace 'your-api-key' with your actual Monster API key
monster_client = client(api_key)
model_summary = 'llama2-7b-chat'

input_data_summary = {
  'prompt':read_text_file('/Users/arnav/Desktop/SBUHacksVI-Hackathon-Project/server/transcriptions.txt'),
  'top_k': 10,
  'top_p': 0.9,
  'temp': 0.9,
  'max_length': 1000,
  'beam_size': 1,
  'system_prompt': 'You are a helpful, respectful and honest and a genius in physics assistant. Always answer as helpfully as possible, while being safe...',
  'repetition_penalty': 1.2,
};

# input_data_questions = {
#   'prompt':read_text_file('./transcriptions.txt'),
#   'top_k': 10,
#   'top_p': 0.9,
#   'temp': 0.9,
#   'max_length': 1000,
#   'beam_size': 1,
#   'system_prompt': 'Provide probable high order thinking questions that can be used to take test from the knowledge',
#   'repetition_penalty': 1.2,
# }


result_summary = monster_client.generate(model_summary, input_data_summary)
# result_questions = monster_client.generate(model , input_data_questions)

# print(result['text']

with open("response.txt", "w") as file:
    text = result_summary['text']
    file.write(text)
# with open('questions.txt' , 'w') as file:

#     ques = result_questions['text']
#     file.write(ques)

# def main() -> None:
  
    # model = genai.GenerativeModel('gemini-pro')
    # response = model.generate_content(read_text_file('./transcriptions.txt'))
    # print(response.text)
    # with open('response.txt', 'w') as t:
    #     t.write(response.text)
    # print("Work In Progress !!")
# if __name__ == "__main__":
#     main()
    

# model_text_to_image = 'txt2img'  # Replace with the desired model name
# input_data = {
#             'prompt': 'detailed sketch of lion by greg rutkowski, beautiful, intricate, ultra realistic, elegant, art by artgerm',
#             'negprompt': 'Be textbook',
#             'samples': 3,
#             'steps': 50,
#             'aspect_ratio': 'square',
#             'guidance_scale': 7.5,
#             'seed': 2414,
#             }

# model_for_chat = 'mpt-7b-instruct'  # Replace with the desired model name
# input_data = {
#   "max_length": 256,
#   "temp": 0.98,
#   "top_k": 40,
#   "top_p": 1
# }



