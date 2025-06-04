import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import nativeFaceDetection from '../specs/NativeMlKit';



const ImagePickerComp = () => {
  const [images, setImages] = useState([]);
  const [facesData, setFacesData] = useState({}); // { imgPath: [face1, face2...] }

  const handleImages = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      maxFiles: 2,
      mediaType: 'photo',
    })
      .then((selectedImages) => {
        setImages(selectedImages);
        setFacesData({}); // clear previous face data
      })
      .catch((error) => {
        console.log('Image picking error:', error);
      });
  };
 


  const detectFaces = async (img) => {
    try {
      const result = await nativeFaceDetection.detectFaces(img.path);
      const parsed = JSON.parse(result); // array of { bounds: { left, top, right, bottom } }

      // Scale face bounds according to displayed image size
      const scaleX = 100 / img.width;
      const scaleY = 100 / img.height;

      const scaled = parsed.map((face) => {
        const b = face.bounds;
        return {
          left: b.left * scaleX,
          top: b.top * scaleY,
          width: (b.right - b.left) * scaleX,
          height: (b.bottom - b.top) * scaleY,
        };
      });

      setFacesData((prev) => ({ ...prev, [img.path]: scaled }));
    } catch (e) {
      console.error('Face detection error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImages} style={styles.button}>
        <Text style={styles.buttonText}>Select Images</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => detectFaces(img)}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: img.path }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {facesData[img.path]?.map((face, i) => (
                  <View
                    key={i}
                    style={[
                      styles.faceBox,
                      {
                        left: face.left,
                        top: face.top,
                        width: face.width,
                        height: face.height,
                      },
                    ]}
                  />
                ))}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImagePickerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    margin: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  faceBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'lime',
    borderRadius: 2,
  },
});