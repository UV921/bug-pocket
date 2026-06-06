//consume the api route hello.tsx deaault server
async function getData() {
    const res=await fetch('http://localhost:3000/api/hello');
    if(!res.ok){
        throw new Error('failed to fetch the data');
    }
    const data =await res.json();
    return(
        <div>
            <h2>welcome to the client side</h2>
            <h1>{data.message}</h1>
        </div>
    )

}
export default getData;