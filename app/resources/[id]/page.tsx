async function Page({ params }: { params: Promise<{ id: string }> }) {
    // asynchronous access of `params.id`.
    const { id } = await params
    return <p>page{id}</p>
  }
  export default Page;
