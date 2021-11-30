import React, { Component } from "react";
import HeaderElement from "./HeaderElement";
import 'github-fork-ribbon-css/gh-fork-ribbon.css'
import './Header.css';

import discordLogo from "./img/discord.png";
import githubLogo from "./img/github.png";
import spigtotWhiteLogo from "./img/spigot-white.png";

class Header extends Component {
  render() {
    return (
      <div>
        <a className="github-fork-ribbon left-top" href="https://github.com/FrankHeijden/serverutils-downloads" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
        <div className="Header">
          <HeaderElement href="https://discord.com/invite/WJGvzue" logo={discordLogo} alt="Discord" />
          <HeaderElement href="https://github.com/FrankHeijden/ServerUtils" logo={githubLogo} alt="GitHub" />
          <HeaderElement href="https://www.spigotmc.org/resources/79599/" logo={spigtotWhiteLogo} alt="SpigotMC" />
        </div>
      </div>
    );
  }
}

export default Header;
