interface TypeItemBase {
  id: number
  deleted?: boolean
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
  /** The username of the item's author. */
  by: string
  /** Creation date of the item, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time). */
  time: Date
  /** The comment, story or poll text. HTML. */
  text?: string
  dead?: boolean
  /** The comment's parent: either another comment or the relevant story. */
  parent?: number
  /** The pollopt's associated poll. */
  poll?: number
  /** The ids of the item's comments, in ranked display order. */
  kids?: number[]
  /** The URL of the story. */
  url?: string
  /** The story's score, or the votes for a pollopt. */
  score?: string
  /** The title of the story, poll or job. HTML. */
  title?: string
  /** A list of related pollopts, in display order. */
  parts?: number[]
  /** In the case of stories or polls, the total comment count. */
  descendants?: number
}

export interface TypeItemStory extends TypeItemBase {
  type: 'story'
}
export interface TypeItemComment extends TypeItemBase {
  type: 'comment'
}
export interface TypeItemAsk extends TypeItemBase {
  type: 'story'
}
export interface TypeItemJob extends TypeItemBase {
  type: 'job'
}
export interface TypeItemPoll extends TypeItemBase {
  type: 'poll'
}
export interface TypeItemParts extends TypeItemBase {
  type: 'pollopt'
}

export type TypeItem =
  | TypeItemStory
  | TypeItemComment
  | TypeItemAsk
  | TypeItemJob
  | TypeItemPoll
  | TypeItemParts

export interface TypeUsers {
  id: number
  /** Creation date of the user, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time). */
  created: Date
  /** The user's karma. */
  karma: number
  /** The user's optional self-description. HTML. */
  about?: string
  /** List of the user's stories, polls and comments. */
  submitted?: number[]
}
