import { uuidv4 } from '@firebase/util';
import { addDoc, collection, doc, getDocs, Query, query, QueryDocumentSnapshot, setDoc, where } from 'firebase/firestore';
import { motion } from 'framer-motion'
import React, { ChangeEvent, createContext, useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase/config';
import { Chat, chatConverter } from '../../firebase/entities/chat';
import { messageConverter } from '../../firebase/entities/message';
import { userConverter, UserEntity } from '../../firebase/entities/user';
import SearchHeader from './SearchHeader'

interface SearchConxtxtModel {
    search: string;
    handleSearchChange: Function
}
const searchInitialState: SearchConxtxtModel = {
    search: '',
    handleSearchChange: () => { }
}

type ChatIdUidMap = {
    chatId?: string,
    uid: string
}

export const SearchContext = createContext<SearchConxtxtModel>(searchInitialState)

const Search = () => {
    const [user] = useAuthState(auth);

    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const [allUsers, setAllUsers] = useState<QueryDocumentSnapshot<UserEntity>[]>([])
    const [searchResults, setSearchResults] = useState<QueryDocumentSnapshot<UserEntity>[]>([])
    const [currentUserChats, setCurrentUserChats] = useState<ChatIdUidMap[]>([])

    const handleSearchChange = (e: ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value)
    }

    const getChatWithFoundUser = (foundUser: UserEntity) => {
        return currentUserChats.map(res => {
            if (res.uid === foundUser.uid) {
                return res
            }
        })[0]
    }
    const createNewChat = async (foundUser: UserEntity) => {
        const chatsRef =
            collection(firestore, "chats").withConverter(
                chatConverter
            )

        const newChatId = uuidv4()
        await addDoc(chatsRef, {
            id: newChatId,
            users: [user!.uid, foundUser.uid]
        })

        return newChatId
    }

    useEffect(() => {
        const getAllChatsOfCurrentUser = async () => {
            const chatsRef = collection(firestore, "chats").withConverter(
                chatConverter
            );
            const q = query(chatsRef, where("users", "array-contains", user?.uid));
            const chats = await getDocs(q)
            return chats.docs.map((chat: QueryDocumentSnapshot<Chat>) => {
                const chatData = chat.data()
                return {
                    chatId: chatData.id,
                    uid: chatData.users.filter(u => u !== user!.uid)[0]
                }
            })
        }

        const getAllUsers = async () => {
            const usersRef = collection(
                firestore,
                "users",
            ).withConverter(userConverter);
            return await getDocs(usersRef);
        }

        getAllUsers().then(res => setAllUsers(res.docs))
        getAllChatsOfCurrentUser().then(chats => setCurrentUserChats(chats))
    }, [])

    useEffect(() => {
        if (search !== '') {
            const filtered = allUsers.filter(foundUser => {
                const userEmail = foundUser.data().email
                if (userEmail.includes(search)) {
                    return userEmail
                }
            })
            setSearchResults(filtered)
        } else setSearchResults([])
    }, [search])

    return (
        <motion.div className="h-[calc(100%-3.8rem)]">
            <SearchContext.Provider value={{ search, handleSearchChange }}>
                <SearchHeader />
                <div className="h-full overflow-y-auto">
                    {searchResults.map(foundUser => {
                        const foundUserData = foundUser.data()
                        return (
                            <div
                                key={uuidv4()}
                                className="border-b dark:border-zinc-800 flex items-center gap-4 px-4 py-1 hover:cursor-pointer hover:backdrop-brightness-150"
                                onClick={() => {
                                    const chatWithFoundUser = getChatWithFoundUser(foundUserData)
                                    if (chatWithFoundUser) {
                                        navigate(`/${foundUserData.email}/${chatWithFoundUser.chatId}`)
                                    } else {
                                        createNewChat(foundUserData)
                                            .then(chatId =>
                                                navigate(`/${foundUserData.email}/${chatId}`)
                                            )
                                    }
                                }}
                            >
                                <div className="h-[3rem] dark:bg-zinc-700 aspect-square rounded-full"></div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-[13px]">{foundUserData.email}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SearchContext.Provider>
        </motion.div >

    )
}

export default Search