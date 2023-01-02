import DefaultHomePage from './homepage'
import WorkerHomePage from './workerhomepage'
export default function Main({setAppBar}){
    return <WorkerHomePage setAppBar={setAppBar}/>
    // return <DefaultHomePage/>
}