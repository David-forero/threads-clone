import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread.id}
          id={thread.id}
          currentUserId={user?.id || ""}
          parentId={thread.text}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.updatedAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
        threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
            <ThreadCard
            key={childItem.id}
            id={childItem.id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.text}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.updatedAt}
            comments={childItem.children}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
