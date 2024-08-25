import Link from "next/link"

export default function Reviewsage() {
  return (
    <>
      <h1>Reviews</h1>
      <ul>
        <li>
          <Link href={"/reviews/hollow-knight"}>hollow-knight</Link>
        </li>
        <li>
          <Link href={"/reviews/stardew-valley"}>Stardew Valley</Link>
        </li>
      </ul>
    </>
  )
}
