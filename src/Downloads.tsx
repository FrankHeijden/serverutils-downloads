import React, { Component } from 'react';
import Platform from './Platform';
import * as semver from 'semver';
import './Downloads.css';

import spigotLogo from './img/spigot.png';
import bungeecordLogo from './img/bungeecord.png';
import velocityLogo from './img/velocity.png';

const platforms = [
    {
        name: 'Spigot',
        platform: 'Bukkit',
        logo: spigotLogo,
    },
    {
        name: 'BungeeCord',
        platform: 'Bungee',
        logo: bungeecordLogo,
    },
    {
        name: 'Velocity',
        platform: 'Velocity',
        logo: velocityLogo,
    },
].map(p => <Platform logo={p.logo} name={p.name} platform={p.platform} />);

type DownloadsState = {
    versionText: string,
}

type ProjectError = {
    error: {
        code: string,
        message: string,
        details: string,
        extra: {
            possibleValues: string[],
        },
    },
}

class Downloads extends Component<{}, DownloadsState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            versionText: 'Fetching latest version...',
        };
    }

    componentDidMount() {
        fetch('/api/v1/Bukkit')
          .then(res => res.json())
          .then((data: ProjectError) => {
              const versions = data.error.extra.possibleValues
                .filter(v => v !== 'latest');

              const latestVersion = versions.sort(semver.rcompare)[0];
              this.setState({
                  versionText: 'ServerUtils v' + latestVersion,
              });
          })
    }

    render() {
        return (
          <div className="Downloads">
              <header className="Downloads-header">
                  <h1 className="Downloads-title">ServerUtils Downloads</h1>
                  <h2 className="Downloads-subtitle">{this.state.versionText}</h2>
                  <div className="Downloads-platforms">{platforms}</div>
              </header>
          </div>
        );
    }
}

export default Downloads;
