/** { download: Boolean, stat: 'in' | 'out', user: GithubName } */
getGratitudeTopStats({ download: false, stat: '', user: '' })

function buildStudentList(list) {
  const getSender = (gratitude) => gratitude.from.githubId
  const getRecipient = (gratitude) => gratitude.githubId

  function buildSenders(user) {
    return list
      .filter((gratitude) => user === getRecipient(gratitude))
      .reduce((result, gratitude) => {
        const sender = getSender(gratitude)
        return ++result[sender] || (result[sender] = 1), result
      }, {})
  }
  function buildRecipients(user) {
    return list
      .filter((gratitude) => user === getSender(gratitude))
      .reduce((result, gratitude) => {
        const recipient = getRecipient(gratitude)
        return ++result[recipient] || (result[recipient] = 1), result
      }, {})
  }

  function buildStudent(github) {
    const sum = (list) => list.reduce((acc, [, counter]) => acc + counter, 0)
    const convert = (obj) => Object.entries(obj).sort(([, a], [, b]) => b - a)
    const senders = convert(buildSenders(github))
    const recipients = convert(buildRecipients(github))
    const inSum = sum(senders)
    const outSum = sum(recipients)
    return { github, inSum, senders, outSum, recipients }
  }

  return list.reduce((result, gratitude) => {
    const [recipient, sender] = [getRecipient(gratitude), getSender(gratitude)]
    if (recipient in result === false) result[recipient] = buildStudent(recipient)
    if (sender in result === false) result[sender] = buildStudent(sender)
    return result
  }, {})
}

function convertToTopList(list, stat) {
  return Object.values(list).sort((a, b) => b[`${stat}Sum`] - a[`${stat}Sum`])
}

async function getGratitudeTopStats(options) {
  const url = 'https://app.rs.school/api/feedback/gratitude'
  const query = `pageSize=999999`

  const res = await fetch(`${url}?${query}`)
  const json = await res.json()

  let result = buildStudentList(json.data.content)

  if (options?.user && options.user in result) result = result[options.user]
  else if (options?.stat) result = convertToTopList(result, options.stat)

  console.info(result)

  if (options?.download) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(result, null, '\t')], { type: 'application/json' })
    )
    a.download = 'stats.json'
    a.click()
  }
}
