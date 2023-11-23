
export class Posts {
  private constructor(
    private user_id: string,
    private post_id: string,
    private likes: number
  ) {}

  public getUser_Id(): string {
    return this.user_id;
  }

  public setUser_Id(newValue: string): void {
    this.user_id = newValue;
  }

  public getPost_Id(): string {
    return this.post_id;
  }

  public setPost_Id(newValue: string): void {
    this.post_id = newValue;
  }

  public getLikes(): number {
    return this.likes;
  }

  public setLikes(newValue: number): void {
    this.likes = newValue;
  }
}
