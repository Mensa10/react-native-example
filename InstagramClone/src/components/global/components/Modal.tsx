import * as React from 'react';
import { Modal, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

interface PropsType {
  visible: boolean;

  onClose: () => void;

  modalText: string;
}

class CustomModal extends React.PureComponent<PropsType, {}> {
  render() {
    const { visible, onClose, modalText } = this.props
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={onClose}>
          <SafeAreaView style={styles.container}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FE697C',
    padding: 20,
    width: '50%',
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  modalText: {
    fontSize: 22,
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  }
})

export default CustomModal;