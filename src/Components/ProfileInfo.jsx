import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthorContext } from "../App"

export default function ProfileInfo()
{
    const {id} = useParams()
    const { authors, editAuthor } = useContext(AuthorContext)
    
    const INITIAL_AUTHOR =
    {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        street: "",
        city: ""
    }
    const [newAuthor, setNewAuthor] = useState(INITIAL_AUTHOR)
    const [updateAuthor, setUpdateAuthor] = useState(INITIAL_AUTHOR)
    
    // PUT an updated author
    useEffect(() =>
    {
        if (!updateAuthor.id)
        return
    
        const putOptions =
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateAuthor)
        }
    
        fetch(`https://boolean-api-server.fly.dev/klaand01/contact/${updateAuthor.id}`, putOptions)
        .then((response) => response.json())
        .then(() => setNewAuthor(INITIAL_AUTHOR))
    }, [updateAuthor])

    if (!authors[0])
        return

    const author = authors[id - 1]
    const initials = author.firstName.charAt(0) + author.lastName.charAt(0)

    const handleInput = (event) =>
    {
        const {name, value} = event.target
        setNewAuthor({...newAuthor, [name]: value})
    }

    const handleClick = () =>
    {
        const tmpAuthor = newAuthor

        // Setting default values if not updated
        if (tmpAuthor.firstName.length === 0)
            tmpAuthor.firstName = author.firstName

        if (tmpAuthor.lastName.length === 0)
            tmpAuthor.lastName = author.lastName

        if (tmpAuthor.email.length === 0)
            tmpAuthor.email = author.email

        if (tmpAuthor.street.length === 0)
            tmpAuthor.street = author.street

        if (tmpAuthor.city.length === 0)
            tmpAuthor.city = author.city

        tmpAuthor.id = author.id
        editAuthor({tmpAuthor})
        setUpdateAuthor(tmpAuthor)
    }

    const style =
    {
        backgroundColor: author.favouriteColour
    }

    return (
        <>
        <main className="main">
            <h2 style={style} className="circle profile">{initials}</h2>
            <h2>{author.firstName} {author.lastName}</h2>
            <main className="profileInfo">
                <div className="information row1">
                    <h3>Account info</h3>
                    <p>First Name*</p>
                    <input type="text" name="firstName" placeholder={author.firstName} value={newAuthor.firstName} onChange={handleInput}></input>
                    <p>Last Name*</p>            
                    <input type="text" name="lastName" placeholder={author.lastName} value={newAuthor.lastName} onChange={handleInput}></input>
                    <p>Email*</p>
                    <input type="text" name="email" placeholder={author.email} value={newAuthor.email} onChange={handleInput}></input>
                    <p>Job Title</p>
                    <input type="text" name="jobTitle" placeholder={author.jobTitle} value={newAuthor.jobTitle} onChange={handleInput}></input>
                </div>
                <div className="information row2">
                    <h3>Address</h3>
                    <p>Street*</p>
                    <input type="text" name="street" placeholder={author.street} value={newAuthor.street} onChange={handleInput}></input>
                    <p>City*</p>
                    <input type="text" name="city" placeholder={author.city} value={newAuthor.city} onChange={handleInput}></input>
                    <p>*Required</p>
                    <button onClick={handleClick}>Save</button>
                </div>
            </main>
        </main>
        </>
    )
}