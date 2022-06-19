HOST = '127.0.0.1' 
PORT = 8000       

from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello World!'
 
if __name__ == '__main__':

    app.run(HOST, PORT)



app.route('/upload', methods = ['GET', 'POST'])
def file_upload():
    if request.method == 'POST': # POST 방식 처리
        f = request.files['file1'] # 받아온 파일 객체 생성
 
        s_filename = secure_filename(f.filename) # 파일명 저장
        file_dir = 'uploads/' + s_filename # 파일을 저장하기 위한 경로 지정
 
        f.save('static/uploads/' + s_filename) # 파일 저장
        files = os.listdir("static/uploads")
 
        upload = {'image': open('static/uploads/' + s_filename, 'rb')} # 업로드하기위한 파일
        res = requests.post('http://127.0.0.1:81/receive', files=upload).json() # JSON 포맷, POST 형식으로 해당 URL에 파일 전송
        machineResult = res['cal_result'] # 받아온 JSON 형식의 response를 처리함
 
