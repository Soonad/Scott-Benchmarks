{-# LANGUAGE RankNTypes #-}

import System.Environment

newtype STree = STree (forall r. (STree -> STree -> r) -> r -> r)

sbin :: STree -> STree -> STree
sbin a b = STree (\ bin tip -> bin a b)

stip :: STree
stip = STree (\ bin tip -> tip)

ssize :: STree -> Int
ssize (STree t) = t (\ a b -> ssize a + ssize b) 1

spow2 :: Int -> STree
spow2 0 = stip
spow2 n = sbin (spow2 (n - 1)) (spow2 (n - 1))

main :: IO()
main = do
  args <- getArgs
  let depth = if length args < 1 then 0 else read (head args)
  print (ssize (spow2 depth))
