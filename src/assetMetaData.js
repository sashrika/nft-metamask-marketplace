import React from 'react'

export default class AssetMetadata extends React.Component {
  render() {
    const { asset } = this.props

    return (
      <React.Fragment>
        <a target="_blank" rel="noopener noreferrer" className=" flex justify-center mb-auto mt-auto  border-gray-300  p-3 items-start text-center d-inline-block m-100" href={asset.openseaLink}>
          <img
            className="items-center"
            alt="Asset artwork"
            src={asset.imageUrl} />
        </a>

        <div className="card-body h-25">

          <h5 className="card-title overflow-ellipsis overflow-hidden whitespace-nowrap py-3 px-6 mb-3 border-t-2  h-18 border-gray-300 r">
            <a target="_blank" rel="noopener noreferrer" className=" text-green-500 font-bold hover:text-green-800" href={asset.openseaLink}>
              {asset.name}
            </a>
          </h5>

          {/* <p className="card-text text-truncate">
            <a target="_blank" rel="noopener noreferrer" href={asset.openseaLink} className="card-link">{asset.assetContract.name} #{asset.tokenId}</a>
          </p> */}
        </div>
      </React.Fragment>
    )
  }
}