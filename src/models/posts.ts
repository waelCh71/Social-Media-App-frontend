import { Comments } from "./comments"
import { Reactions } from "./reactions"

export interface Posts{

    
    id:string

    type:string

    title:string

     audiance:string

     createdAt:string

     text:string

     urlMedia:string

     userId:string

     isBlocked:string

     nbReactions:number

     nbComments:number

     isReactedByUser:boolean

     //TODO COMMENT AND REACTION
     reactions:Comments[]

     comments:Reactions[]
}