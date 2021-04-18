import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import {useEffect} from 'react'
import useFirebaseAuthentication from '../components/use-firebase-auth'
import 'firebaseui/dist/firebaseui.css'

// const firebaseui = dynamic(() => import('firebaseui'), {ssr: false})

// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// const StyledFirebaseAuth = dynamic(() => import('react-firebaseui/StyledFirebaseAuth'), {
//     ssr: false,
//     loading: () => <p>...</p>
// })


const LoginFinal = () => {
  useEffect(async () => {
    
    // delay the import until window object is ready
    const firebaseui = await import("firebaseui");
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
    signInFlow: 'popup',
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                fullLabel: 'Entrar com Google',
                //cliendId: '288390999298-nmv85fmrplv7p569t4fcq8g2377cr8o5.apps.googleusercontent.com',
            },
            {
                provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                fullLabel: 'Entrar com Facebook',
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                fullLabel: 'Entrar com email'
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                fullLabel: 'Enviar link para email',
            },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };
    ui.start("#firebaseui", uiConfig);
   
  });

  return <div id="firebaseui" />;
};

export default function Home() {
    const [firebaseUser] = useFirebaseAuthentication();

    return (
        <div className={styles.container}>
            <Head>
                <title>Template</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Template
                </h1>
                {
                    firebaseUser
                    ? <a onClick={() => firebase.auth().signOut()}>Sign-out, {firebaseUser.displayName}</a>
                    : <LoginFinal />
                    // : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                }
            </main>
        </div>
    )
}
