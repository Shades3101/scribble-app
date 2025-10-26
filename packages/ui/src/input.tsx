interface Inputface {
    placeholder: string
    type: string
}

export function InputBox({ placeholder, type } : Inputface) {

    return <div>
        <input placeholder={placeholder} type = {type}></input>
    </div>
}