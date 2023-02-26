import DefaultHomePage from './defaulthomepage'
import LoggedInHomepage from './loggedinhomepage'
export default function Main({setAppBar}){
    if(localStorage.getItem('cookie')){
        return <LoggedInHomepage setAppBar={setAppBar}/>
    }else{
        return <DefaultHomePage/>
    }
}