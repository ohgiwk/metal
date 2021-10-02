FROM node:16.10.0
USER root

#パッケージリストを更新
RUN apt-get update
#日本語化パッケージリストをインストール
RUN apt-get -y install locales && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
#言語を日本語に設定
ENV LANGUAGE ja_JP:ja
ENV LANG ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
#タイムゾーンを日本に設定
ENV TZ JST-9

