function Home() {
    return <div>
        <h1>Welcome to the react code challenge</h1>
        <p>
            In this challenge, we are going to build a simple frontend application in React to display data from the Star Wars API (<a
            href="https://swapi.info/" target="_blank" rel="noreferrer">https://swapi.info/</a>)
        </p>
        <p>
            The Star Wars API exposes data via Rest and can be called by Any Application.
        </p>
        <p>
            Your challenge is to create an application that can display ALL the data available in the API,
            with pages to list entries and pages to show single items
        </p>
        <p>
            Don't worry about time, we know that this challenge needs a lot of time.
        </p>
        <p>
            We want to see how you break the problem into smaller parts
            and how far you can go
        </p>
        <p>
            here are some code snippets, just to speed up the development, you don't need to use them
            if you don't want
        </p>

        <code>
            <pre>
                <b>To access the list of people from the star wars api:</b><br/>
                <br/>
                const response = await fetch("https://swapi.info/api/people/")<br/>
                const result = await response.json();<br/>
                <br/>

                <b>Search people:</b><br/>
                <br/>
                const response = await fetch("https://swapi.info/api/people/?search=r2")<br/>
                const result = await response.json();<br/>
                <br/>

                <b>Pagination:</b><br/>
                <br/>
                const response = await fetch("https://swapi.info/api/people/?page=2")<br/>
                const result = await response.json();<br/>
                <br/>
                <br/>

                <b>To access only 1 person:</b><br/>
                <br/>
                const response = await fetch("https://swapi.info/api/people/1/")<br/>
                const result = await response.json();<br/>
            </pre>
        </code>
    </div>
}

export default Home;
