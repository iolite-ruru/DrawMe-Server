@app.route('/receive', methods=['GET', 'POST'])
def receive():
    if request.method == 'POST':
        f = request.files['image'] # 보낸 파일을 받아옴
        f.save('static/images/' + secure_filename(f.filename)) # 해당 파일 저장
        files = os.listdir("static/images")
 
        remove_background.remove('static/images/' + secure_filename(f.filename)) # 배경 제거
 
        # 머신러닝 결과를 변수에 저장
        predition = model.predict_food_transfer(model_transfer, test_transform, class_names, 'static/images/result.jpg')
 
        os.remove('static/images/' + secure_filename(f.filename))
 
    return jsonify({"cal_result": predition}) # 머신러닝 결과 반환
