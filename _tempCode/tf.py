
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications import MobileNet
from tensorflow.keras import optimizers


import numpy as np
from tensorflow import keras
from tensorflow.keras.preprocessing import image
from keras.applications.imagenet_utils import preprocess_input

model = keras.models.load_model('./model.json')

img = image.load_img('./TestDataset/test/rabbit/rabbit18.jpg', target_size=(224, 224))
img_array = image.img_to_array(img)
img_batch = np.expand_dims(img_array, axis=0)
img_preprocessed = preprocess_input(img_batch)
np.set_printoptions(suppress=True)

probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])
prediction = probability_model.predict(img_preprocessed/255)

print(prediction)
