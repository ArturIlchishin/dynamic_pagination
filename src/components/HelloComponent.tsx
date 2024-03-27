import {AnimatedComponent} from "./AnimatedComponent";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import './styles.css'

export const HelloComponent = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/comments');
        }, 3000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={'hello__container'}>
            <AnimatedComponent>
                <h1 className={'hello__title'}>Hello!</h1>
            </AnimatedComponent>
        </div>
    )
}