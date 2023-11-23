export class Posts {
  private constructor(
    private creator_id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private created_at: number,
    private updated_at: number
  ) {}

  public getCreator_Id(): string {
    return this.creator_id;
  }

  public setCreator_Id(newValue: string): void {
    this.creator_id = newValue;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(newValue: string): void {
    this.content = newValue;
  }

  public getLike(): number {
    return this.likes;
  }

  public setLike(newValue: number): void {
    this.likes = newValue;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public setDislikes(newValue: number): void {
    this.dislikes = newValue;
  }

  public setCreated_at(newValue: number): void {
    this.created_at = newValue;
  }

  public getCreated_at(): number {
    return this.created_at;
  }

  public setUpdate_at(newValue: number): void {
    this.updated_at = newValue;
  }

  public getUpdate_at(): number {
    return this.updated_at;
  }
}
