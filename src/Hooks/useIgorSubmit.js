import {useActionData, useSubmit} from "react-router-dom";
import {useEffect, useState} from "react";

export const useIgorSubmit = () => {
    const currentActionData = useActionData()
    const submit = useSubmit()
    const [callbackQueue, setCallbackQueue] = useState([])
    const [prevActionData, setPrevActionData] = useState(currentActionData)

    if (currentActionData !== prevActionData)
        setPrevActionData(currentActionData)

    useEffect(() => {
        if (callbackQueue.length > 0) {
            callbackQueue[0](currentActionData)
            setCallbackQueue([])
        }
    }, [callbackQueue, currentActionData])

    const mySubmit = async (form, callback, formInfo, beforeCallback) => {
        submit(form, formInfo)

        if (beforeCallback)
            beforeCallback()

        await new Promise(resolve => setTimeout(resolve, 3000))

        setCallbackQueue([callback])
    }

    return [mySubmit, currentActionData]
};

export default useIgorSubmit;