export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: string,
    private created_at: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(newValue: string): void {
    this.id = newValue;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newValue: string): void {
    this.name = newValue;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newValue: string): void {
    this.email = newValue;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(newValue: string): void {
    this.password = newValue;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(newValue: string): void {
    this.role = newValue;
  }

  public getCreated_at(): number {
    return this.created_at;
  }

  public setCreated_at(newValue: number): void {
    this.created_at = newValue;
  }
}
