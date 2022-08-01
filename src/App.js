import { useState, useEffect } from 'react'
import './App.css';
import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react'
import Amplify, { I18n } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import awsconfig from './aws-exports'
import { vocabularies } from './assets/amplify/vocabularies'

I18n.putVocabularies(vocabularies)
I18n.setLanguage('ja')
Amplify.configure(awsconfig) // eslint-disable-line

function App() {
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])
  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
      <h2>コンポーネント</h2>
      <p>{user.attributes.email}</p>
    </div>
  ) : (
    <AmplifyAuthenticator />
  )
}

export default App;
