import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications import MobileNet
from tensorflow.keras import optimizers


import numpy as np
import matplotlib.image as mpimg
import matplotlib.pyplot as plt

#train data set
train_datagen = ImageDataGenerator(rescale=1./255,
                                   horizontal_flip=True,
                                   width_shift_range=0.1,
                                   height_shift_range=0.1,
                                   rotation_range=5,
                                   shear_range=0.7,
                                   zoom_range=[0.9, 2.2],
                                   vertical_flip=True)

train_generator = train_datagen.flow_from_directory(
    './TestDataset/train',
    target_size=(150,150),
    batch_size=5,
    color_mode='rgb',
    subset='training',
    class_mode='categorical'
)

#test data set
test_datagen = ImageDataGenerator(rescale=1./255)

test_generator = test_datagen.flow_from_directory(
    './TestDataset/test',
    target_size=(150,150),
    batch_size=5,
    color_mode='rgb',
    subset='validation',
    class_mode='categorical'
)

#모델 구조
model = Sequential()
# model.add(base_model)
model.add(Conv2D(32, (3, 3), input_shape=(150, 150, 3))) #컨볼루션 층 추가   #1->3으로 수정하니 해당 에러 해결됨 #channels?? 3?????
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Conv2D(32, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Conv2D(64, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))

model.add(Flatten())
# model.add(Dense(64))
# model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(3, activation='softmax')) #출력층 노드 갯수 = 종류 수




#모델 실행 환경
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

from gc import callbacks
earlystopping = EarlyStopping(monitor='loss', patience=5) #val_loss

history = model.fit(
    train_generator,
    epochs=10,
    validation_data = test_generator,
    validation_steps=3,
    callbacks=[earlystopping]
)

print("==========================")
print(history.history['acc'])
print(history.history['accuracy'])

