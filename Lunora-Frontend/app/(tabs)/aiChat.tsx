import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hi! What kind of workout help do you need today?' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
    };

    const aiReply: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: 'Got it! I’ll generate a plan for you shortly.',
    };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setInput('');

    // Scroll to end after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={Platform.OS !== "ios" ? styles.safe : styles.IOSsafe}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
        </View>

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask something..."
            placeholderTextColor="#a47c7c"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5E6E6',
  },
  IOSsafe: {
    flex: 1,
    backgroundColor: '#F5E6E6',
    marginBottom: 80
  },
  container: {
    flex: 1,
    backgroundColor: '#F5E6E6',
  },
  header: {
    backgroundColor: '#BF7D7D',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    padding: 20,
    paddingBottom: 10, // space for input
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  aiBubble: {
    backgroundColor: '#D2A5A5',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#784B4B',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
  inputBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FDECEC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#784B4B',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 10,
  },
  sendText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
