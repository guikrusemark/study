import './DropdowList.css'

const DropdownList = (props) => {
    return (
        <div className="dropdownList">
            <label htmlFor="dropdownList">{props.label}</label>
            <select name="dropdownList" id="dropdownList" 
                    value={props.value} onChange={event => props.onChangeHandler(event.target.value)} >
                {props.optionItems.map((optionItem) => 
                    <option key={optionItem} 
                            value={optionItem}>
                        {optionItem}
                    </option> 
                )}
            </select>
        </div>
    )
}

export default DropdownList;
