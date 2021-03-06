import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.REACT_API_ApiKey,
  authDomain: process.env.REACT_APP_AuthDomain,
  projectId: process.env.REACT_APP_ProjectId,
  storageBucket: process.env.REACT_APP_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSenderId,
  appId: process.env.REACT_APP_AppId
};

const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app)

export const getProducts = (categoryId) => {
  return new Promise((res, rej) => {
    const collectionRef = categoryId ?
      query(collection(firestoreDb, 'productos'), where('category', '==', categoryId)) :
      collection(firestoreDb, 'productos');

    getDocs(collectionRef).then(querySnapshot => {
      const productos = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data()}
      })      
      res(productos);
    }).catch((err) => {
        rej('Error al obtener los productos', err);
      })
  })
}

export const getProduct = (productId) => {
  return new Promise((res, rej) => {
    const docRef = doc(firestoreDb, 'productos', productId);

      getDoc(docRef).then(response => {
          const producto = { id: response.id, ...response.data()}
          res(producto)
      }).catch((err) => {
        rej('Error al obtener el producto', err); 
      })
  })
}