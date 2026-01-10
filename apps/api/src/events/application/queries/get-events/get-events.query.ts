export class GetEventsQuery {
  constructor(
    public readonly limit: number = 10,
    public readonly offset: number = 0,
  ) {}
}
