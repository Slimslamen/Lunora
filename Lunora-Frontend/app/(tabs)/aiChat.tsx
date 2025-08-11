// AIChatScreen.tsx
import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LIGHT_COLORS, DARK_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext'

export default function AIChatScreen() {
  const TContext = useContext(ThemeContext)
  const { darkMode } = TContext
  
  const scheme = useColorScheme()
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS 

  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'ai' }>>([])
  const [input, setInput] = useState('')
  const flatRef = useRef<FlatList>(null)

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (flatRef.current) {
      flatRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { id: `u${Date.now()}`, text: input.trim(), sender: 'user' as const }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const aiMsg = {
        id: `a${Date.now()}`,
        text: `AI: You said "${userMsg.text}"`,
        sender: 'ai' as const,
      }
      setMessages(prev => [...prev, aiMsg])
    }, 800)
  }

  const renderItem = ({ item }: { item: { id: string; text: string; sender: string } }) => {
    const isUser = item.sender === 'user'
    return (
      <View
        style={[
          styles.bubble,
          {
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            backgroundColor: isUser ? colors.accent : colors.cardBg,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={{ color: isUser ? '#fff' : colors.textPrimary }}>{item.text}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.container}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Chat with LunorAI</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Ask anything about your workouts</Text>

        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
        />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[styles.inputContainer, {backgroundColor: colors.textSecondary}]}>  
            <TextInput
              style={[styles.input]}
              placeholder="Type a message..."
              placeholderTextColor={colors.accent}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, paddingBottom: 70 },
  headerTitle: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  headerSubtitle: { fontSize: 16, textAlign: 'center', marginBottom: 12 },
  messagesContainer: { flexGrow: 1, paddingVertical: 8 },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 12,
  },
})
