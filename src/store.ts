import { create  , type StateCreator} from "zustand";
//StateCreator
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// export interface UserSlice {
//     username:string;
//     email:string;
//     setUsername:(username:string)=> void;
//     setEmail :(email:string) => void;
// }


// //Zustand Slices
// export const createUserslice : StateCreator<UserSlice>= (set) =>({
//         username:'Emmanuel',
//         email:'emmanuel@gmail.com',
//         setUsername:(username:string)=> set(()=>({username}) ),
//         setEmail:(email:string)=>set(()=>({email})),
// });

// export interface PostsSlice {
//     usernames:string;
// }

// export const createPostsSlice : StateCreator<PostsSlice> = (set)=>({
//     usernames:'anson_2',
// })




// export const useAppStore = create(
//     devtools<UserSlice & PostsSlice>(
//         (...a) =>({
//             ...createUserslice(...a),
//             ...createPostsSlice(...a)
//         })
//     ) 
// );

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


export const usePostsStore =  create(
    devtools(
        immer<PostsStore>(
        (set) =>({
        posts:[],
        setPosts:(posts:Post[])=> set(()=>({posts})),
        addPost:(post:Post) =>
            set((state)=>({
           posts:[...state.posts ,post] 
        })),
        removePost:(id:string)=>set((state)=>({posts:state.posts.filter(
            (post)=>post.id != id)
        })),

})),
{name:"posts" , store:"Posts"}
    )
    
);