import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();


  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
      {/* <UserButton afterSignOutUrl="/"/> */}
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id || ""}
                parentId={post.text}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.updatedAt}
                comments={post.children}
              />
            ))}
          </>
        )
      }
      </section>
    </div>
  )
}