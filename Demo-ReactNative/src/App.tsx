import React, {useState, type ReactNode} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    borderWidth: 1,
  },
});

const App: React.FC<{children?: ReactNode}> = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isOpen, setOpen] = useState(true);
  const [text, setText] = useState('');

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <ScrollView>
        <Text style={styles.title}>title {isOpen ? 'Open' : 'Close'}</Text>
        <Button title="Switch" onPress={() => setOpen(!isOpen)} />
        <View>{children}</View>
        <Image
          source={{uri: 'https://reactnative.dev/docs/assets/p_cat1.png'}}
          style={styles.image}
        />
        <TextInput style={styles.input} value={text} onChangeText={setText} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
