export default function Warning(props)  {
    return <div className="grid grid-cols-3 mt-6 pt-3">
                    <div className="col-span-1">
                        <span className="text-red-600 font-weight-600 border-2 border-red-400 p-1 mt-4">{props.warn}</span>
                    </div>
                </div>
}