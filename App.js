import React, { useState } from 'react';
import { Text } from 'react-native-elements'
import { useSelector, Provider, useDispatch } from 'react-redux'
import { createStore } from 'redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/Ionicons"
import { ToastProvider } from 'react-native-toast-notifications'
import rootReducer from './src/reducer'
import Home from './src/pages/Home'
import Logout from './src/components/Logout';
import TimeClock from './src/pages/TimeClock'
import TimeHistory from './src/components/TimeHistory'
import TimeHistoryItem from './src/components/TimeHistoryItem'
import Expenditure from './src/pages/Expenditure'
import ExpenditureItem from './src/components/ExpenditureItem'
import CreateJobSite from './src/components/CreateJobSite'
import AddReceipt from './src/components/AddReceipt'
import EditReceipt from './src/components/EditReceipt'
import BackIcon from './src/components/core/BackIcon'
import PlusIcon from './src/components/core/PlusIcon';
import Tasks from './src/pages/Tasks'
import Task from './src/components/Task'
import CreatTask from './src/components/CreateTask'
import Chat from './src/pages/Chat'
import Message from './src/components/Message'
import Login from './src/pages/Auth/Login'
import Signup from './src/pages/Auth/Signup'
import { ConfirmMail, EnterCode, Success } from './src/pages/Auth/ResetPassword'
import { getAuth } from './src/constants/auth'

const AuthStack = createStackNavigator()
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ConfirmMail"
        component={ConfirmMail}
        options={() => ({
          title: "",
          headerLeft: () => <BackIcon />,
        })}
      />
      <AuthStack.Screen
        name="EnterCode"
        component={EnterCode}
        options={() => ({
          title: "",
          headerLeft: () => <BackIcon />,
        })}
      />
      <AuthStack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

const HomeStack = createStackNavigator()
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      defaultScreenOptions="Home"
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerRight: () => <Logout />,
        })}
      />
    </HomeStack.Navigator>
  )
}

const TimeStack = createStackNavigator()
const TimeStackScreen = () => {
  return (
    <TimeStack.Navigator
      defaultScreenOptions="TimeClock"
    >
      <TimeStack.Screen
        name="TimeClock"
        component={TimeClock}
      />
      <TimeStack.Screen
        name="TimeHistory"
        component={TimeHistory}
        options={() => ({
          headerLeft: () => <BackIcon />,
        })}
      />
      <TimeStack.Screen
        name="HistoryItem"
        component={TimeHistoryItem}
        options={() => ({
          headerLeft: () => <BackIcon />,
        })}
      />
    </TimeStack.Navigator>
  )
}

const ExpenditureStack = createStackNavigator()
const ExpenditureStackScreen = () => {
  return (
    <ExpenditureStack.Navigator
      defaultScreenOptions="Expenditure"
    >
      <ExpenditureStack.Screen
        name="Expenditure"
        component={Expenditure}
      />
      <ExpenditureStack.Screen
        name="ExpenditureItem"
        component={ExpenditureItem}
        options={({ route }) => ({
          headerTitle: () => <Text h5>{route.params.name}</Text>,
          headerLeft: () => <BackIcon />,
        })}
      />
      <ExpenditureStack.Screen
        name="CreateJobSite"
        component={CreateJobSite}
        options={{
          headerTitle: "Create Job Site",
          headerLeft: () => <BackIcon />,
        }}
      />
      <ExpenditureStack.Screen
        name="AddReceipt"
        component={AddReceipt}
        options={{
          headerTitle: "Add New Receipt",
          headerLeft: () => <BackIcon />,
        }}
      />
      <ExpenditureStack.Screen
        name="EditReceipt"
        component={EditReceipt}
        options={{
          headerTitle: "Edit Receipt",
          headerLeft: () => <BackIcon />,
        }}
      />
    </ExpenditureStack.Navigator>
  )
}

const TasksStack = createStackNavigator()
const TasksStackScreen = () => {
  return (
    <TasksStack.Navigator
      defaultScreenOptions="Tasks"
    >
      <TasksStack.Screen
        name="Tasks"
        component={Tasks}
      />
      <TasksStack.Screen
        name="Task"
        component={Task}
        options={({ route }) => ({
          headerTitle: () => <Text h5>{route.params.user.name}</Text>,
          headerLeft: () => <BackIcon />,
        })}
      />
      <TasksStack.Screen
        name="CreateTask"
        component={CreatTask}
        options={() => ({
          headerTitle: "Create Task",
          headerLeft: () => <BackIcon />,
        })}
      />
    </TasksStack.Navigator>
  )
}

const ChatStack = createStackNavigator()
const ChatStackScreen = () => {

  const navigation = useNavigation();
  const [showCreateChat, setShowCreateChat] = useState(false)

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        options={() => ({
          headerRight: () => <PlusIcon callBack={() => setShowCreateChat(true)}/>,
        })}
      >
        {props => <Chat {...props} showCreateChat={showCreateChat} setShowCreateChat={setShowCreateChat}/>}

      </ChatStack.Screen>
      <TasksStack.Screen
        name="Message"
        component={Message}
        props={true}
        options={({ route }) => ({
          headerTitle: () => <Text h5>CHAT</Text>,
          headerLeft: () => <BackIcon />,
        })}
      />
    </ChatStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const Navigations = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.state.authenticated)
  getAuth().then(res => {
    if (res) dispatch({ type: "LOGIN_SUCCESS", auth: res })
  })

  return (
    authenticated ?
      <Tab.Navigator
        initialRouteName="DashBoard"
        screenOptions={{
          "tabBarShowLabel": false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="DashBoardTab"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="TimeClockTab"
          component={TimeStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="time" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ExpenditureTab"
          component={ExpenditureStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="map" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="TasksTab"
          component={TasksStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="list" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ChatTab"
          component={ChatStackScreen}
          options={{
            // TODO
            // Unread message Count
            tabBarBadge: 1,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-chatbubbles" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
      :
      <AuthStackScreen />
  )
}

const store = createStore(rootReducer)
const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer>
          <Navigations />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  </SafeAreaProvider>
)

export default App;
