class ContributorList {
  private readonly contributors = new Map<string, number>()

  public addContribution({ github }: { github: string }) {
    const count = this.contributors.get(github) ?? 0

    this.contributors.set(github, count + 1)
  }

  public toJSON() {
    const contributorList: { github: string; count: number }[] = []

    let totalCount = 0

    this.contributors.forEach((count, github) => {
      contributorList.push({ github, count })
      totalCount += count
    })

    contributorList.sort((a, b) => (a.count === b.count ? a.github.localeCompare(b.github) : b.count - a.count))

    return { list: contributorList, count: totalCount }
  }
}

export default function createContributorList() {
  return new ContributorList()
}
