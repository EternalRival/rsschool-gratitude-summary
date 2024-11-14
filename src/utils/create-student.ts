import createContributorList from './create-contributor-list'

class Student {
  private readonly github: string

  private readonly receivers = createContributorList()

  private readonly senders = createContributorList()

  constructor({ github }: { github: string }) {
    this.github = github
  }

  public addGratitude({ github, type }: { github: string; type: 'receivers' | 'senders' }) {
    this[type].addContribution({ github })
  }

  public toJSON() {
    return {
      github: this.github,
      receivers: this.receivers.toJSON(),
      senders: this.senders.toJSON(),
    }
  }
}

export default function createStudent({ github }: { github: string }) {
  return new Student({ github })
}
