import {NextPage} from 'next'

const getData = async () => {
  return fetch('https://dev.to/api/articles?username=porok12')
    .then(response => response.json())
}

const Page: NextPage = async () => {
  const data = await getData()

  return (
    <>
      {JSON.stringify(data, null, 2)}
    </>
  )
}

export default Page
