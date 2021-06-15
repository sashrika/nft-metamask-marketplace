import React from 'react'

const MAX_ADDR_LEN = 6
const OPENSEA_URL = "https://opensea.io"

export default class Account extends React.Component {

  render() {
    const { account, showImage } = this.props;
    const _username = account.user
      ? account.user.username
      : null;
    const _address = account.address;
    const displayName = _username ? _username : _address.substring(2, MAX_ADDR_LEN + 2).toUpperCase();

    return (
      <a target="_blank" rel="noopener noreferrer" href={`${OPENSEA_URL}/accounts/${_address}`}>
        {showImage && account
          ? <div style={{ backgroundImage: 'url("' + account.image + '")' }} />
          : null
        }
        <span className="text-green-600 hover:text-green-900 font-medium">{displayName}</span>
      </a>
    )
  }
}
