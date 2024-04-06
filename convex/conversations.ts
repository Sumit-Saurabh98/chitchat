import { mutation } from "./_generated/server";
import {ConvexError, v} from "convex/values"


export const createConversation = mutation({
    args: {
        participents: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.id("_storage")),
        admin: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();

       if(!identity) throw new ConvexError("Unauthorized user");

       // john and bob
       // [john bob]
       // [bob john]

       const existingConversation = await ctx.db
       .query("conversations")
       .filter((q)=> 
       q.or(
        q.eq(q.field("participents"), args.participents),
        q.eq(q.field("participents"), args.participents.reverse())
       )
       )
       .first();

       
       if (existingConversation) {
        return existingConversation._id;
       }

       let groupImage;

       if(args.groupImage){
        
        groupImage = (await ctx.storage.getUrl(args.groupImage)) as string;
       }

       const conversationId = await ctx.db.insert("conversations", {
        participents: args.participents,
        isGroup: args.isGroup,
        groupName: args.groupName,
        groupImage,
        admin: args.admin
       })

       return conversationId
    }
})

export const generateUploadUrl = mutation(async (ctx) =>{

    return ctx.storage.generateUploadUrl();
})