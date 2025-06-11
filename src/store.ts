import { create  , type StateCreator} from "zustand";
import { devtools , persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export interface UserStore {
    username:string;
    email:string;
    setUsername:(username:string)=> void;
    setEmail :(email:string) => void;
}

export interface Post{
    id: string;
    title:string;
    content:string;
}
export interface PostsStore{
    posts:Post[];
    setPosts:(posts:Post[])=> void;
    addPost:(post:Post)=>void;
    removePost:(id:string) => void;
}

export const useUserStore =  create(
    devtools<UserStore>(
        (set) =>({
        username:'Emmanuel',
        email:'emmanuel@gmail.com',
        setUsername:(username:string)=> set(()=>({username}) ),
        setEmail:(email:string)=>set(()=>({email})),
}),{name:"user" , store:"user"}) 
);

//without persist
// export const usePostsStore =  create(
//     devtools(
//         immer<PostsStore>
//         (
//         (set) =>({
//         posts:[],
//         setPosts:(posts:Post[])=> set(()=>({posts})),
//         addPost:(post:Post) =>
//             set((state)=>{
//                 state.posts.push(post)
//         //    posts:[...state.posts ,post] 
//         }),
//         removePost:(id:string)=>
//             set((state) =>{
//                 const index = state.posts.findIndex((post)=>post.id === id);
//                 if(index !== -1){
//                     state.posts.splice(index , 1);
//                 }
//                     // posts:state.posts.filter((post)=>post.id != id)
//         }),

// })
// ),
// {name:"posts" , store:"Posts"}
//     )
    
// );
 //with persist
export const usePostsStore = create<PostsStore>()(
  devtools(
    persist(
      immer((set) => ({
        posts: [],
        setPosts: (posts: Post[]) => set(() => ({ posts })),
        addPost: (post: Post) =>
          set((state) => {
            state.posts.push(post);
          }),
        removePost: (id: string) =>
          set((state) => {
            const index = state.posts.findIndex((post) => post.id === id);
            if (index !== -1) {
              state.posts.splice(index, 1);
            }
          }),
      })),
      {
        name: 'posts', // name of item in the storage (must be unique)
      }
    ),
    {
      name: 'posts-store', // a unique name for the devtools
    }
  )
);