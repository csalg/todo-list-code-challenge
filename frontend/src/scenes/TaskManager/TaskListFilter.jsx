import React, {useContext} from "react";
import Context from "./context";

export default ({tags}) => {
    return (<div className="my-5 tab-list">
        <SearchBox/>
        <CompletedTasksCheckbox/>
        <TagsFilter tags={tags}/>
    </div>)
}

const SearchBox = () => {
    const [context, setContext] = useContext(Context)
    const setText = (text) => setContext({...context, text: text})
    return (
        <input
            placeholder={"Filter text in the title or description"}
            onKeyDown={
                event => {
                    setText(event.target.value);
                }}
            style={{
                width: "100%"
            }}
        />
    )
}

const CompletedTasksCheckbox = () => {
    const [context, setContext] = useContext(Context)
    const toggleShowCompletedFlag = () => (
        setContext({
            ...context,
            showCompleted: !context.showCompleted
        })
    )

    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                checked={context.showCompleted}
                onClick={toggleShowCompletedFlag}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">Show completed tasks</label>
        </div>
    )
}


const TagsFilter = ({tags}) => {
    const [context, setContext] = useContext(Context)
    const toggleTagInFilterSet = selectedTag => {
        if (context.tags.includes(selectedTag)) {
            return setContext({
                ...context,
                tags: context.tags.filter(tag => tag !== selectedTag)
            })
        } else {
            return setContext({
                ...context,
                tags: [...context.tags, selectedTag]
            })
        }
    }
    return <div>
        {tags.map(tag => <Tag
            tag={tag}
            included={context.tags.includes(tag)}
            clickCallback={toggleTagInFilterSet}
        />)}
    </div>
}

const Tag = ({tag, clickCallback, included}) => {
    const includedStyleClassname = included ? "badge-secondary" : 'badge-light'
    return (
        <span
            className={`badge badge-pill ${includedStyleClassname}`}
            style={{fontWeight: 500, color: "#444"}}
            onClick={() => clickCallback(tag)}
        >
            {tag}{console.log("Tag", tag, included)
        }
        </span>
    )
}

