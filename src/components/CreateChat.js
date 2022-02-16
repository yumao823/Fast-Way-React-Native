import React, { useState } from 'react';
import { Button, Input, Text, Avatar, ListItem } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import ScreenBox from './core/ScreenBox';
import { useSelector } from 'react-redux';
import { AVATAR } from '../constants';

const CreateChat = ({handleData}) => {

    const toast = useToast()
    const users = useSelector(state => state.state.users)
    const auth = useSelector(state => state.state.auth);
    const { userId } = auth;

    const [name, setName] = useState("")
    const [addedUsers, setAddedUsers] = useState([]);

    const showToastErr = (message) => {
        return toast.show(message, {
            type: "warn",
            placement: "bottom",
            duration: 2000,
            animationType: "zoom-in"
        })
    }

    const handleCreate = () => {
        axios.post(`http://localhost:8000/api/chats`, {
            users: [...addedUsers.map(user => user._id), userId]
        })
            .then(res => {
                handleData(res.data)
                toast.show("Created Successfully", {
                    type: "success",
                    placement: "bottom",
                    duration: 2000,
                    animationType: "zoom-in"
                })
            })
            .catch(error => {
                const errorResponse = error.response?.data.errors.name.message || "Connection Error";
                showToastErr(errorResponse)
            })
    }

    const handleSearch = () => {

        if (name.length < 1) {
            return []
        }

        let filtered = users.filter(user => user._id !== userId);

        if (name.length >= 1) {

            filtered = filtered.filter(
                (user) => (user.name).toLowerCase().indexOf(name.trim().toLowerCase()) > -1
            )
        }

        for (const addedUser of addedUsers) {
            filtered = filtered.filter((user) => user._id !== addedUser._id)
        }

        return filtered
    }

    return (
        <ScreenBox type="center">
            <Input
                value={name}
                placeholder="Find Users"
                leftIcon={{ type: 'ionicon', name: 'person' }}
                onChangeText={e => setName(e)}
            />
            {handleSearch().map(user => (
                <TouchableOpacity key={`ta-${user._id}`} onPress={() => setAddedUsers([...addedUsers, user])}>
                    <ListItem bottomDivider>
                        <Avatar
                            rounded
                            source={{ uri: user.photo !== undefined ? `data:image/png;base64,${user.photo}` : AVATAR }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            ))}

            {addedUsers.length > 0

                ?
                <View>
                    <Text>Added Users</Text>

                        {addedUsers.map(addedUser => (
                            <TouchableOpacity key={`ta-${addedUser._id}`} onPress={() => setAddedUsers(addedUsers.filter((user) => user._id !== addedUser._id))}>
                                <ListItem bottomDivider>
                                    <Avatar
                                        rounded
                                        source={{ uri: addedUser.photo !== undefined ? `data:image/png;base64,${addedUser.photo}` : AVATAR }}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>{addedUser.name}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>
                        ))}
                    <Button title="Create Chat" onPress={handleCreate} />


                </View>

                :

                <Text>No Users Added</Text>
            }

        </ScreenBox>
    )
}

export default CreateChat;