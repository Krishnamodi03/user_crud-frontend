// import { React, useState, useEffect } from 'react'
// import axios from 'axios'
// const App = () => {
//   const [myData, setMyData] = useState([])
//   const [isError, setIsError] = useState("")
//   const getMyPostData = async () => {
//     try {
//       const response = await axios('https://jsonplaceholder.typicode.com/posts')
//       setMyData(response.data)
//     }
//     catch (error) {
//       setIsError(error.message)
//     }
//   }
//   useEffect(() => {
//     getMyPostData()
//   }, [])

//   return (
//     <div className='w-full bg-slate-700 text-slate-200'>
//       <h1 className='text-6xl text-center'>Post Data</h1>
//       {
//         isError !== "" && <p className='text-red-500 text-lg'>{isError}</p>
//       }

//       <div className='flex flex-wrap max-w-[120rem] gap-14 justify-center mt-4'>
//         {
//           myData.map((post) => {
//             const { body, id, title } = post
//             return (
//               <div key={id} className='bg-transparent text-center border p-[2em] rounded-lg shadow-2xl max-w-96'>
//                 <h2 className='text-2xl pb-4'>{title}</h2>
//                 <p className='text-md'>{body}</p>
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

// export default App



import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserList />,
  },
  {
    path: '/posts/:id',
    element: <PostDetail />,
  },
  {
    path: '/add-user',
    element: < AddUser />
  },
  {
    path: '/admin-login',
    element: <Login />
  }
])
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<PostList />} />
    //     <Route path="/posts/:id" element={<PostDetail />} />
    //   </Routes>
    // </Router>

    // OR

    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
